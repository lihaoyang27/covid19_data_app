import '../style/welcome.scss'

const Welcome = () => {

    return(
        <>
            <div className='logoContainer' style={{backgroundImage:"url(./media/background.png)"}}>
                <div className='bigLogo'style={{backgroundImage:"url(./media/LOGO_white.png)"}}> </div>
                <div className='fog'style={{backgroundImage:"url(./media/fog.png)"}}> </div>
            </div>
        </>
    )
}

export default Welcome