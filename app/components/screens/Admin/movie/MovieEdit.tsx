import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import formStyles from '@/components/ui/form-elements/admin-form.module.scss'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import SlugField from '@/ui/form-elements/SlugField/SlugField'
import UploadField from '@/ui/form-elements/UploadField/UploadField'
import Heading from '@/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/SkeletonLoaader'
import { stripHtml } from 'string-strip-html'
import Meta from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

import { IMovieEditInput } from './movie-edit.interface'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'
import { useAdminTags } from './useAdminTags'
import { useMovieEdit } from './useMovieEdit'

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
	ssr: false,
})

const MovieEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})

	const { onSubmit, isLoading } = useMovieEdit(setValue)
	const { data: genres, isLoading: isGenresLoading } = useAdminGenres()
	const { data: actors, isLoading: isActorsLoading } = useAdminActors()
    const { data:tags, isLoading:isTagsLoading}=useAdminTags()

	return (
		<Meta title="Edit movie">
			<AdminNavigation />
			<Heading title="Edit movie" />
			{isLoading ? (
				<SkeletonLoader count={5} />
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
					<div className={formStyles.fields}>
						<Field
							{...register('title', {
								required: 'Название обязательно!',
							})}
							placeholder="Название"
							error={errors.title}
						/>
						<SlugField
							generate={() =>
								setValue('slug', generateSlug(getValues('title')))
							}
							register={register}
							error={errors.slug}
						/>
						
						<Field
							{...register('parameters.duration', {
								required: 'Длительность обязательна!',
							})}
							placeholder="Длительность (мин.)"
							error={errors.parameters?.duration}
						/>
					

						<Controller
							name="genres"
							control={control}
							rules={{
								required: 'Нужна хотя бы одна категория!',
							}}
							render={({ field, fieldState: { error } }) => (
								<DynamicSelect
									error={error}
									field={field}
									placeholder="Категории"
									options={genres || []}
									isLoading={isGenresLoading}
									isMulti
								/>
							)}
						/>
                        <Controller
							name="tags"
							control={control}
							rules={{
								required: 'Нужен хотя бы один тэг!',
							}}
							render={({ field, fieldState: { error } }) => (
								<DynamicSelect
									error={error}
									field={field}
									placeholder="Тэги"
									options={tags || []}
									isLoading={isTagsLoading}
									isMulti
								/>
							)}
						/>
						<Controller
							name="actors"
							control={control}
							rules={{
								required: 'Нужен хотя бы один актер!',
							}}
							render={({ field, fieldState: { error } }) => (
								<DynamicSelect
									error={error}
									field={field}
									placeholder="Актеры"
									options={actors || []}
									isLoading={isActorsLoading}
									isMulti
								/>
							)}
						/>
                    
						<Controller
							name="poster"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									placeholder="Картинка фильма"
									error={error}
									folder="movies"
									image={value}
									onChange={onChange}
								/>
							)}
							rules={{
								required: 'Картинка обязательна!',
							}}
						/> 

						<Controller
							name="videoUrl"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									placeholder="Видео"
									error={error}
									folder="movies"
									image={value}
									onChange={onChange}
									style={{ marginTop: -25 }}
									isNoImage
								/>
							)}
							rules={{
								required: 'Видео обязательно!',
							}}
						/>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<textarea className={formStyles.textarea} placeholder="Описание"
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
					</div>

					<Button>Обновить</Button>
				</form>
			)}
		</Meta>
	)
}

export default MovieEdit
