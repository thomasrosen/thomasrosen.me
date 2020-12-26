import styles from './Month.module.css'

import {
	Business as BusinessIcon
} from '@material-ui/icons'

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

	return <div className={styles.infos_by_type}>
		<h3>
			<div className={styles.icon}>
				<BusinessIcon />
			</div>
			<span>Organisation</span>
		</h3>
		<div className={styles.cards}>
			{
				docs.map(org => <OrgCard key={org.shortname} data={org} />)
			}
		</div>
	</div>
}

function Month({year, month, data}) {
	return <div className={styles.month}>
		<h2>{month} {year}</h2><br/>
		{renderRoles(data.role)}
		{renderOrgs(data.org)}
	</div>
}

export default Month
