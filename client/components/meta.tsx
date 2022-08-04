import Head from "next/head"

function Meta({ title }: { title: string }) {
    return (
        <Head>
            <title>{ `${title} - ZEXT` }</title>
        </Head>
    )
}

export default Meta