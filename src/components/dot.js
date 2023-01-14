export default function Dot({
  color = 'var(--text-color)',
}) {
  return <div style={{
    display: 'inline-block',
    width: '0.8rem',
    height: '0.8rem',
    borderRadius: '50%',
    verticalAlign: 'middle',
    marginInlineEnd: '0.8rem',
    backgroundColor: color,
  }}></div>
}
