import OrgCard from './OrgCard.js'

function renderRoles(docs){
	if (!(!!docs) || docs.length === 0) {
		return null
	}

	return <div>
		<h2>Roles / Titel / Positionen</h2>
		<ul>
		{
			docs.map(role => <li key={role.name}>{role.name}</li>)
		}
		</ul>
	</div>
}

function renderOrgs(docs){
	if (!(!!docs) || docs.length === 0) {
		return null
	}

	return <div>
		<h2>Organisation</h2>
		{
			docs.map(org => <OrgCard key={org.shortname} data={org} />)
		}
	</div>
}

function Month({year, month, data}) {
	return <div>
		<strong>{month} {year}</strong><br/>
		{renderRoles(data.role)}
		{renderOrgs(data.org)}
	</div>
}

export default Month
