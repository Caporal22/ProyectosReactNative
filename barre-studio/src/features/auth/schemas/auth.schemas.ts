import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().required('El correo es obligatorio').email('Formato de correo inválido'),
  password: yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
});

export const registerSchema = yup.object({
  fullName: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
  phone: yup
    .string()
    .required('El teléfono es obligatorio')
    .matches(/^\d{10}$/, 'Deben ser 10 dígitos'),
  email: yup.string().required('El correo es obligatorio').email('Formato inválido'),
  password: yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().required('El correo es obligatorio').email('Formato inválido'),
});

export type LoginForm = yup.InferType<typeof loginSchema>;
export type RegisterForm = yup.InferType<typeof registerSchema>;
export type ForgotForm = yup.InferType<typeof forgotPasswordSchema>;
