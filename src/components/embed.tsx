

export function Embed(props: { url: string }) {
    return <iframe src={props.url} title=""/>;
}