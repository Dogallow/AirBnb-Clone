

const Footer = () => {
    return (
        <div style={{ width: '100%', height: '25px',position:'relative', bottom: '0px', marginTop:'10px'}}>
            <div style={{ width: '100%', height: '25px', display: 'flex', justifyContent: 'right', alignItems: 'center', borderTop: ' 1px solid #DDD', position: 'fixed', bottom: '0px', backgroundColor: 'white' }}>
                Created by Donovan Galloway:
                <a href="https://github.com/Dogallow" target="_blank">
                    <img style={{height: '20px', width: '20px', marginLeft: '5px'}} src="https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-github-1.png" alt="Github Logo" />
                </a>
                <a href="https://github.com/Dogallow" target="_blank" style={{paddingLeft: '5px'}}>
                    <i class="fa-brands fa-linkedin fa-xl"></i>
                </a>
            </div>
        </div>
    )
}

export default Footer
