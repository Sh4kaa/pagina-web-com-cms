import { useRouter } from "next/router"

export default function Post() {
  const params = useRouter()
  const { id } = params.query

  console.log()
  return (
    <div style={{ color: 'white' }}>Post{id}</div>
  )
}
