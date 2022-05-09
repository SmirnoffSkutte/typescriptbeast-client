import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import Field from '@/components/ui/form-elements/Field'

import { validEmail } from '@/shared/regex'

interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<any>
	isPasswordRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({
	register,
	formState: { errors },
	isPasswordRequired = false,
}) => {
	return (
		<>
			<Field
				{...register('email', {
					required: 'Нужен e-mail!',
					pattern: {
						value: validEmail,
						message: 'Пожалуйста,введите правильный e-mail',
					},
				})}
				placeholder="E-mail"
				error={errors.email}
			/>
			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Необходим пароль!',
								minLength: {
									value: 6,
									message: 'Минимум пароля-6 символов',
								},
						  }
						: {}
				)}
				placeholder="Пароль"
				type="password"
				error={errors.password}
			/>
		</>
	)
}

export default AuthFields
