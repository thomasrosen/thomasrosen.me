// import './Timeline.css'

import { useState, useEffect } from 'react'
import { flatten } from 'flat'
import Month from './Month.js'

// ([_\d]{4})-([_\d]{2})-([_\d]{2}).([_\d]{2}):([_\d]{2}):([_\d]{2})


// const iso_regex = /([_\d]{4})-([_\d]{2})-([_\d]{2}).([_\d]{2}):([_\d]{2}):([_\d]{2})/

// function date_part_to_number(date_part){
// 	date_part = Number.parseInt(date_part)
// 	if (date_part === 0 || !!date_part) {
// 		return date_part
// 	}
// 	return -1
// }

// function date_string_to_object(date_string){
// 	const date_object = {
// 		year: -1,
// 		month: -1,
// 		day: -1,
// 		// hour: -1,
// 		// minute: -1,
// 		// second: -1,
// 	}

// 	const matches = iso_regex.exec(date_string)
// 	date_object.year = date_part_to_number(matches[1])
// 	date_object.month = date_part_to_number(matches[2])
// 	date_object.day = date_part_to_number(matches[3])
// 	date_object.hour = date_part_to_number(matches[4])
// 	date_object.minutes = date_part_to_number(matches[5])
// 	date_object.seconds = date_part_to_number(matches[6])

// 	return date_object
// }

// function addDataGroups(data){
// 	data.events = data.events.map(event => {
// 		const start = {
// 			...event.start,
// 			...date_string_to_object(event.start.iso || ''),
// 		}	
// 		const end = {
// 			...event.end,
// 			...date_string_to_object(event.end.iso || ''),
// 		}	

// 		return {
// 			...event,
// 			start,
// 			end,
// 		}
// 	})

// 	const years = {}
// 	for (const event of data.events) {
// 		if (event.start.year > -1) {
// 			if (!(!!years[event.start.year])) {
// 				years[event.start.year] = {
// 					year: event.start.year,
// 					events: [],
// 					orgs: [],
// 					topics: [],
// 				}
// 			}

// 			years[event.start.year].events.push(event)
// 			years[event.start.year].orgs.concat(event.orgs)
// 			years[event.start.year].topics.concat(event.topics)
// 		}
// 	}

// 	data.years = Object.values(years)

// 	return data
// }

function Timeline() {
	const [by_month_data, setByMonthData] = useState(null)
	const [by_year_data, setByYearData] = useState(null)

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
		
			const start_dates = timeline_structure.start_dates
	
			const new_by_month_data = {}
			const new_by_year_data = {}
			for (const data of flat_data) {
				if (!!start_dates[data.type]) {
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
		})
	}, [])

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

			if (!!by_year_data[year]) {
				months.push(<Month key={year} year={year} month={-1} data={by_year_data[year]} />)
			}

			for (let month = start_month; month >= end_month; month-=1) {
				if (!!by_month_data[year+'_'+month]) {
					months.push(<Month key={year+'_'+month} year={year} month={month} data={by_month_data[year+'_'+month]} />)
				}
			}
		}

		return months
	}

	return null
}

export default Timeline
