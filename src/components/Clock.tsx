import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { ClockProps } from './types'

const Clock: React.FC<ClockProps> = ({ id, name, timezone, onDelete }) => {
	const [time, setTime] = useState<string>(getCurrentTime())
	const [secondsAngle, setSecondsAngle] = useState<number>(0)
	const [minutesAngle, setMinutesAngle] = useState<number>(0)
	const [hoursAngle, setHoursAngle] = useState<number>(0)

	useEffect(() => {
		const intervalSecId = setInterval(() => {
			const now = moment().utcOffset(Number(timezone) * 60)
			const seconds = now.seconds()
			const minutes = now.minutes()
			const hours = now.hours()

			const secondsAngle = (seconds / 60) * 360
			const minutesAngle = ((minutes + seconds / 60) / 60) * 360
			const hoursAngle = ((hours + minutes / 60) / 12) * 360

			setSecondsAngle(secondsAngle)
			setMinutesAngle(minutesAngle)
			setHoursAngle(hoursAngle)

			setTime(getCurrentTime())
		}, 1000)

		return () => {
			clearInterval(intervalSecId)
		}
	}, [])

	function getCurrentTime() {
		const currentTime = moment()
			.utcOffset(Number(timezone) * 60)
			.format('HH:mm:ss')
		return `${name} (${timezone}): ${currentTime}`
	}

	return (
		<div className='clock-container'>
			<div className='clock'>
				<div
					className='hour hand'
					style={{ transform: `rotate(${hoursAngle}deg)` }}
				></div>
				<div
					className='minute hand'
					style={{ transform: `rotate(${minutesAngle}deg)` }}
				></div>
				<div
					className='second hand'
					style={{ transform: `rotate(${secondsAngle}deg)` }}
				></div>
			</div>
			<div>{time}</div>
			<button className='remove-button' onClick={() => onDelete(id)}>
				⨯
			</button>
		</div>
	)
}

export default Clock
