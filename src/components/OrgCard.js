function OrgCard({data}) {

	console.log('data', data)

	const color = data['color.hex'] || 'black'

	return <div style={{
		display: 'inline-block',
		padding: '16px',
		margin: '16px',
		border: '1px solid '+color,
	}}>{data.name}</div>
}

export default OrgCard
