export function Image(props: { src: string }) {
  return <img src={props.src} alt="" class="h-auto rounded-lg" loading="lazy" />;
}
