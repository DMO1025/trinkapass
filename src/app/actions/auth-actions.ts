// src/app/actions/auth-actions.ts
'use server';

import { getUserByEmail, addUser } from '@/lib/data-service';
import type { UserData, OrganizerSafeData, OrganizerRegistrationData } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

interface UnifiedAuthResult {
  success: boolean;
  message: string;
  user?: OrganizerSafeData; // OrganizerSafeData is Omit<UserData, 'password_hash'>
  userType?: 'admin' | 'organizer';
}

export async function unifiedLoginAction(credentials: { email: string; password: string }): Promise<UnifiedAuthResult> {
  try {
    const user = await getUserByEmail(credentials.email);

    if (!user) {
      return { success: false, message: 'Usuário não encontrado.' };
    }

    // Plain text password comparison (NEVER use in production)
    const passwordMatch = user.password_hash === credentials.password;

    if (!passwordMatch) {
      return { success: false, message: 'Senha incorreta.' };
    }

    if (user.tipo !== 'admin' && user.tipo !== 'organizer') {
      // This also covers cases where 'tipo' might be 'buyer' or undefined
      return { success: false, message: 'Acesso negado. Tipo de usuário não permitido para login nesta área.' };
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = user;
    return { 
      success: true, 
      message: 'Login bem-sucedido!', 
      user: userWithoutPassword, 
      userType: user.tipo as 'admin' | 'organizer' // Safe to cast after validation
    };

  } catch (error) {
    console.error('Unified login error:', error);
    return { success: false, message: 'Ocorreu um erro durante o login. Tente novamente.' };
  }
}


export async function organizerRegisterAction(data: OrganizerRegistrationData): Promise<UnifiedAuthResult> {
  try {
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      return { success: false, message: 'Este e-mail já está cadastrado.' };
    }

    const hashedPassword = data.password_hash; 

    const newUser: UserData = {
      id: `org-${uuidv4()}`, 
      nome: data.nome,
      email: data.email,
      password_hash: hashedPassword,
      tipo: 'organizer',
      whatsapp: data.whatsapp,
    };

    const addedUser = await addUser(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = addedUser;

    return { 
        success: true, 
        message: 'Cadastro realizado com sucesso!', 
        user: userWithoutPassword,
        userType: 'organizer' // Explicitly set userType for registration
    };

  } catch (error)
 {
    console.error('Organizer registration error:', error);
    return { success: false, message: 'Ocorreu um erro durante o cadastro. Tente novamente.' };
  }
}
