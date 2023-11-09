
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { createClient } from "@/prismicio"
import { CreateClientConfig } from "@prismicio/next"

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>



export default function Post({ data }: PageProps) {

  return (
    <div style={{ color: 'white' }}>Post</div>
  )
}


export const getServerSideProps = async ({ params, req }: GetServerSidePropsContext) => {
  console.log(params?.id)

  const prismic = createClient(req as CreateClientConfig)
  const data = await prismic.getByUID('post', String(params?.id))
  console.log(data.data.title[0]?.text)


  return {
    props: { data }
  }
}
