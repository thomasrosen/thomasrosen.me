import styles from './Month.module.css'

import {
	Business as BusinessIcon,
	PermIdentity as PermIdentityIcon,
} from '@material-ui/icons'

// import OrgCard from './OrgCard.js'

const month_names = 'January,February,March,April,May,June,July,August,September,October,November,December'.split(',')

function renderRoles(docs, hide_the_headline){
	if (!(!!docs) || docs.length === 0) {
		return null
	}

	return <div className={
		[
			styles.infos_by_type,
			hide_the_headline ? styles.hidden_headline : null,
		].join(' ')
	}>
		<h6 className={styles.headline}>
			<div className={styles.icon}>
				<PermIdentityIcon />
			</div>
			<span>Roles {/* Roles / Titel / Positionen */}</span>
		</h6>
		<ul className={styles.list}>
		{
			docs.map(role => <li key={role.name}><strong>{role.name}</strong>{!!role.at_orgs ? <p>{role.at_orgs.join(', ')}</p> : null}</li>)
		}
		</ul>
	</div>
}

function renderOrgs(docs, hide_the_headline){
	if (!(!!docs) || docs.length === 0) {
		return null
	}

	return <div className={
		[
			styles.infos_by_type,
			hide_the_headline ? styles.hidden_headline : null,
		].join(' ')
	}>
		<h6 className={styles.headline}>
			<div className={styles.icon}>
				<BusinessIcon />
			</div>
			<span>Organisations</span>
		</h6>
		<ul className={styles.list}>
		{
			docs.map(role => <li key={role.name}>{role.name}</li>)
		}
		</ul>
	</div>
}

function Month({year, month, data, hide_the_headline}) {
	return <div className={styles.month}>
		<h4>{month_names[month-1]} {year}</h4>
		{renderRoles(data.role, hide_the_headline === true)}
		{renderOrgs(data.org, hide_the_headline === true)}
	</div>
}

export default Month
