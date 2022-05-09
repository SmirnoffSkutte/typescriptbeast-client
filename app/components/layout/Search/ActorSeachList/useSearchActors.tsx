import { useDebounce } from "@/hooks/useDebounce"
import { ActorService } from "@/services/actor.service"
import { ChangeEvent, useState } from "react"
import { useQuery } from "react-query"

export const useSearchActors=()=>{
    const [searchTerm,setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm,500)

    const {isSuccess,data}=useQuery(['search actors list',debouncedSearch],()=>
    ActorService.getAllNoPages(debouncedSearch),{
        select: ({data}) => data,
        enabled: !!debouncedSearch
    })

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return {isSuccess,handleSearch,data,searchTerm}
}