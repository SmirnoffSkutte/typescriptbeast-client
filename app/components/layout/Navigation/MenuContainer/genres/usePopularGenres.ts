import { GenreService } from "@/services/genre.service"
import { getGenreUrl } from "config/url.config"
import { useQuery } from "react-query"
import { IMenuItem } from "../menu.interface"

export const usePopularGenres = () =>{

    const queryData = useQuery('popular genre menu',()=> GenreService.getAll(),
    {
        select:({data}) => data.map(genre => ({
            link:getGenreUrl(genre.slug),
            title: genre.name
        } as IMenuItem)),

        onError(error){
            //errors
        }
    })
    return queryData
}