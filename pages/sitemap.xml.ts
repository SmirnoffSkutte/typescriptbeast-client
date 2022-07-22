import { ActorService } from '@/services/actor.service'
import { GenreService } from '@/services/genre.service'
import { TagService } from '@/services/tag.service'
import * as fs from 'fs'
import { GetServerSideProps } from "next"

const BASE_URL=process.env.REACT_APP_URL

async function getUrls() {
  
const genreLinks=await GenreService.getAll()
.then(res=>res.data.map((genre)=>(
  `${BASE_URL}/genre/${genre.slug}`
)))
const tagLinks=await TagService.getAll()
.then(res=>res.data.map((tag)=>(
  `${BASE_URL}/tag/${tag.slug}`
)))
const actorLinks=await ActorService.getAllNoPages()
.then(res=>res.data.map((actor)=>(
  `${BASE_URL}/actor/${actor.slug}`
)))
const genedlinks=[...genreLinks,...tagLinks,...actorLinks]
return genedlinks
}

const Sitemap = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {

  const dynamicPaths=await getUrls() // Здесь может быть вызов с любого API

  const staticPaths = fs
    .readdirSync("pages")
    .filter(staticPage => {
      return ![
        "api",
        "actor",
        "genre",
        "tag",
        "manage",
        "movie",
        "auth.tsx",
        "favoritesPage.tsx",
        "profile.tsx",
        "_app.tsx",
        "_document.tsx",
        "404.tsx",
        "sitemap.xml.tsx",
      ].includes(staticPage)
    })
    .map(staticPagePath => {
      return `${BASE_URL}/${staticPagePath.split('.')[0]}`
    })

  const allPaths = [...staticPaths, ...dynamicPaths]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths.map(url => (
        `<url>
          <loc>${url===`${BASE_URL}/index` ? `${BASE_URL}` : url}</loc>
          <changefreq>${url===`${BASE_URL}/index` ? `daily` : "monthly"}</changefreq>
          <priority>1.0</priority>
        </url>`
      )).join("")}
    </urlset>
  `

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default Sitemap