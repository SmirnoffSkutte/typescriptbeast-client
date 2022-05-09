import styles from './VideoPlayer.module.scss'
import cn from 'classnames'
import { FC , useRef, useState } from 'react'
// import svg from '../../../assets/svg/'
import { useVideo } from './useVideo'
import { IVideoPlayer } from './video.types'

const VideoPlayer: FC<IVideoPlayer> = ({ videoSource}) => {
	const { actions, videoRef, video } = useVideo()
    const barRef = useRef<HTMLDivElement>(null)
	const [isFirstOpen,setIsFirstOpen]=useState(true)
	// if (null !== barRef.current) {
	// 	const rect = barRef.current.getBoundingClientRect();
	//   }
	return (
        <div className={styles.mainwrapper}>
		<div
			className={cn(styles.wrapper, 
				'h-148')}
		>
				<>
					<video
						ref={videoRef}
						className={styles.video}
						src={`${videoSource}#t=1`}
						onClick={actions.toggleVideo}
						preload="metadata"
					/>

					{video.isPlaying ? (
						<div>
							
					<div className={styles.progressBarContainer}
                    ref={barRef}
                    onClick={(e)=>{
						if (null !== barRef.current) {
							const w=barRef.current.offsetWidth
							const o = e.nativeEvent.offsetX
							console.log(w)
							console.log(o)
							// const rect = barRef.current.getBoundingClientRect();
							// actions.toggleVideo
							let click=video.videoTime * (o/w)
							actions.changeTime(click)
						  }
                    }
                    }
                    
                    >
						
					<div
						style={{ width: `${video.progress}%` }}
						className={styles.progressBar}
					/>
					</div>

					<div className={styles.controls}>
						<div>
							<button onClick={actions.revert}>
								{/* <MaterialIcon name="MdHistory" /> */}
                                ↶
							</button>

							<button
								onClick={actions.toggleVideo}
								className={styles.playButton}
							>
								{/* <MaterialIcon
									name={video.isPlaying ? 'MdPause' : 'MdPlayArrow'}
								/> */}
                                | |
							</button>

							<button onClick={actions.fastForward}>
							↷
							</button>

							<div className={styles.timeControls}>
								<p className={styles.controlsTime}>
									{Math.floor(video.currentTime / 60) +
										':' +
										('0' + Math.floor(video.currentTime % 60)).slice(-2)}
								</p>
								<p> / </p>
								<p className={styles.controlsTime}>
									{Math.floor(video.videoTime / 60) +
										':' +
										('0' + Math.floor(video.videoTime % 60)).slice(-2)}
								</p>
							</div>	
						</div>
						<div>
							<button onClick={actions.fullScreen}>
							⛶
							</button>
						</div>
					</div>
							
						</div>
					):(
						
							<button name='play' className={styles.playCenterButton} onClick={actions.toggleVideo}>
								▶
							</button>
						
					)}


				</>
			
		</div>
        </div>
	)
}

export default VideoPlayer
