import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const useFormValidation = <T extends Record<string, any>>(
  schema: Yup.ObjectSchema<T>
): UseFormReturn<T> => {
  return useForm<T>({
    resolver: yupResolver(schema) as any,
  });
};
