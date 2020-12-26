import styles from './Month.module.css'

import {
	Business as BusinessIcon
} from '@material-ui/icons'

import OrgCard from './OrgCard.js'

const month_names = 'January,February,March,April,May,June,July,August,September,October,November,December'.split(',')

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
			<span>Organisations</span>
		</h6>
		<ul className={styles.list}>
		{
			docs.map(role => <li key={role.name}>{role.name}</li>)
		}
		</ul>
	</div>
}

function Month({year, month, data}) {
	return <div className={styles.month}>
		<h4>{month_names[month-1]} {year}</h4><br/>
		{renderRoles(data.role)}
		{renderOrgs(data.org)}
	</div>
}

export default Month
