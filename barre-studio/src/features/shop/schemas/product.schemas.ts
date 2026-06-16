import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required('Nombre obligatorio').min(2, 'Mínimo 2 caracteres'),
  description: yup.string().required('Descripción obligatoria'),
  price: yup.number().required('Precio obligatorio').min(1, 'Debe ser mayor a 0'),
  category: yup
    .string()
    .oneOf(['bebida', 'termo', 'calceta', 'otro'])
    .required('Categoría obligatoria'),
  stock: yup.number().required('Stock obligatorio').min(0, 'No puede ser negativo'),
});

export type ProductForm = yup.InferType<typeof productSchema>;
