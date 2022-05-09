import { IGenreEditInput } from './genre-edit.interface'
import { useGenreEdit } from './useGenreEdit'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import formStyles from '@/components/ui/form-elements/admin-form.module.scss'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import SkeletonLoader from '@/components/ui/SkeletonLoaader'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'


// "^[./]((?!scss).)*$",


const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useGenreEdit(setValue)

	return (
		<Meta title="Edit genre">
			<AdminNavigation />
			<Heading title="Редактирование жанра" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Название обязательно!',
								})}
								placeholder="Название"
								error={errors.name}
								style={{ width: '49%' }}
							/>

							<div style={{ width: '49%' }}>
								<SlugField
									generate={() =>
										setValue('slug', generateSlug(getValues('name')))
									}
									register={register}
									error={errors.slug}
								/>
							</div> 

						</div>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<textarea className={formStyles.textarea} placeholder="Description"
								onChange={onChange}
								value={value}></textarea>
							)}
							rules={{
								validate: {
									required: (v) =>
										(v && stripHtml(v).result.length > 0) ||
										'Описание обязательно!',
								},
							}}
						/> 
						<Button>Редактировать</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default GenreEdit
