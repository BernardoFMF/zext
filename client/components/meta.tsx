import Head from "next/head";

export default function Meta({ title }: { title: string }) {
    return (
        <Head>
            <title>{ `${title} - ZEXT` }</title>
        </Head>
    )
}