import styles from './VideoPlayer.module.scss'
import cn from 'classnames'
import { FC , useEffect, useRef, useState } from 'react'
// import svg from '../../../assets/svg/'
import { useVideo } from './useVideo'
import { IVideoPlayer } from './video.types'


const VideoPlayer: FC<IVideoPlayer> = ({ videoSource,poster}) => {
	const { actions, videoRef, video } = useVideo()
    const barRef = useRef<HTMLDivElement>(null)
	const volumeRef=useRef<any>(null)
	const [isFirstOpen,setIsFirstOpen]=useState(true)
	const [hold,SetHold]=useState(false)
	// if (null !== barRef.current) {
	// 	const rect = barRef.current.getBoundingClientRect();
	//   }
	const debounce=()=>{

	}
	useEffect(()=>{
		if (videoRef.current !== null){
			videoRef.current.volume=0.1
		}
	},[])
	return (
        <div className={styles.mainwrapper}>
		<div
			// onMouseMove={}
			className={cn(styles.wrapper, 
				'h-148')}
		>
				<>
					<video
						ref={videoRef}
						className={styles.video}
						src={`${videoSource}`}
						// onClick={actions.toggleVideo}
						controls
						poster={poster}
						preload="metadata"
					/>
				</>
			
		</div>
        </div>
	)
}

export default VideoPlayer
