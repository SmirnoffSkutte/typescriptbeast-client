import { TagService } from "@/services/tag.service"
import { getTagUrl } from "config/url.config"
import { useQuery } from "react-query"
import { IMenuItem } from "../menu.interface"

export const useTagsMenu = () =>{

    const queryData = useQuery('tags menu',()=> TagService.getAll(),
    {
        select:({data}) => data.map(tag => ({
            link:getTagUrl(tag.slug),
            title: tag.name
        } as IMenuItem)),

        onError(error){
            //errors
        }
    })
    return queryData
}