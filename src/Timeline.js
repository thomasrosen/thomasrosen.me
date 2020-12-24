// import './Timeline.css'

import { useState, useEffect } from 'react'
import { flatten } from 'flat'
import Month from './Month.js'

function Timeline() {
	const [by_month_data, setByMonthData] = useState(null)

	useEffect(() => {
		import('./timeline_data.yml').then(timeline_data => {
			const flat_data = Object.keys(timeline_data.default.data)
			.reduce((flat_data, key) => {
				flat_data = flat_data.concat(
					timeline_data.default.data[key]
					.map(node => flatten({
						...node,
						type: key,
					}, {safe:true}))
				)
				return flat_data
			}, [])

			const start_dates = timeline_data.default.start_dates

			const new_by_month_data = {}
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
				}
			}

			setByMonthData(new_by_month_data)
		})
	}, [])

	if (!!by_month_data) {
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
