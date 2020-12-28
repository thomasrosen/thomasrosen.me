// import './Timeline.css'

import { useState, useEffect, useMemo } from 'react'
import { flatten } from 'flat'
import Month from './Month.js'

function Timeline() {
	const [timeline_structure, setTimelineStructure] = useState(null)
	const [flat_data, setFlatData] = useState(null)
	const [by_month_data, setByMonthData] = useState(null)
	const [by_year_data, setByYearData] = useState(null)

	const types_to_show = useMemo(()=>['role'], [])

	useEffect(() => {
		let timeline_structure = {}

		Promise.all([
			new Promise(resolve => import('../timeline_structure.yml')
				.then(new_timeline_structure => {
					timeline_structure = new_timeline_structure.default
					resolve([])
				})
			),		
			new Promise(resolve => import('../data/event.yml')
				.then(data => resolve(data.default.docs
					.map(doc => ({
						...doc,
						type: 'event',
					}))
				))
			),
			new Promise(resolve => import('../data/org.yml')
				.then(data => resolve(data.default.docs
					.map(doc => ({
						...doc,
						type: 'org',
					}))
				))
			),
			new Promise(resolve => import('../data/role.yml')
				.then(data => resolve(data.default.docs
					.map(doc => ({
						...doc,
						type: 'role',
					}))
				))
			),
			new Promise(resolve => import('../data/topic.yml')
				.then(data => resolve(data.default.docs
					.map(doc => ({
						...doc,
						type: 'topic',
					}))
				))
			),
		])
		.then(docs => {
			const flat_data = []
			.concat(...docs)
			.map(doc => flatten(doc, {safe:true}))

			setTimelineStructure(timeline_structure)
			setFlatData(flat_data)
		})
	}, [])
		
	useEffect(() => {
		if (!(!!timeline_structure && !!flat_data)) {
			return;
		}

		const start_dates = timeline_structure.start_dates

	
		const new_by_month_data = {}
		const new_by_year_data = {}
		for (const data of flat_data) {
			if ((types_to_show.length === 0 || types_to_show.includes(data.type)) && !!start_dates[data.type]) {
				const start_date_key = start_dates[data.type]
				const year = data[start_date_key+'.year']
				const month = data[start_date_key+'.month']
		
				if (!!year && !!month) {
					if (!(!!new_by_month_data[year+'_'+month])) {
						new_by_month_data[year+'_'+month] = {}
					}
					if (!(!!new_by_month_data[year+'_'+month][data.type])) {
						new_by_month_data[year+'_'+month][data.type] = []
					}
					new_by_month_data[year+'_'+month][data.type].push(data)
				}
				if (!!year) {
					if (!(!!new_by_year_data[year])) {
						new_by_year_data[year] = {}
					}
					if (!(!!new_by_year_data[year][data.type])) {
						new_by_year_data[year][data.type] = []
					}
					new_by_year_data[year][data.type].push(data)
				}
			}
		}

		setByMonthData(new_by_month_data)
		setByYearData(new_by_year_data)
	}, [timeline_structure, flat_data, types_to_show])


	if (!!by_month_data && !!by_year_data) {
		const months = []
		const now = new Date()
		const current_year = now.getFullYear()
		const current_month = now.getMonth()+1
		for (let year = current_year; year >= 1996; year-=1) {
			let start_month = 12
			if (year === current_year) {
				start_month = current_month
			}

			let end_month = 1
			if (year === 1996) {
				end_month = 12
			}

			// if (!!by_year_data[year]) {
			// 	months.push(<Month key={year} year={year} month={-1} data={by_year_data[year]} />)
			// }

			for (let month = start_month; month >= end_month; month-=1) {
				if (!!by_month_data[year+'_'+month]) {
					months.push(<Month key={year+'_'+month} year={year} month={month} data={by_month_data[year+'_'+month]} hide_the_headline={types_to_show.length === 1} />)
				}
			}
		}

		return months
	}

	return null
}

export default Timeline
