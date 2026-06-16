import * as yup from 'yup';

export const classSchema = yup.object({
  name: yup.string().required('Nombre obligatorio').min(3, 'Mínimo 3 caracteres'),
  instructor: yup.string().required('Maestro obligatorio'),
  description: yup.string().required('Descripción obligatoria').min(10, 'Mínimo 10 caracteres'),
  durationMin: yup
    .number()
    .required('Duración obligatoria')
    .min(15, 'Mínimo 15 min')
    .max(180, 'Máximo 180 min'),
  capacity: yup.number().required('Capacidad obligatoria').min(1, 'Mínimo 1').max(50, 'Máximo 50'),
});

export type ClassForm = yup.InferType<typeof classSchema>;
