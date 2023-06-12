import Skeleton from 'react-loading-skeleton'

const ServiceCardSkeleton = ({notList}) => {
    if(notList===true){
        return(
            <div className="service-card col-lg-3 line-height-1 d-none d-lg-flex">
                <div className="row service-card-header">
                    <Skeleton height="200px" inline={false}/> 
                </div>
                <div className="row service-card-content">
                    <h3><Skeleton/></h3><br/>
                    <p><Skeleton/></p>
                </div>
                <div className="row service-card-footer">
                    <div className='col-6'>
                        <strong><Skeleton/></strong>
                    </div>
                    <div className='col-6 text-right'>
                        <strong><Skeleton/></strong>
                    </div>
                    <Skeleton className="book-button-div button-skeleton col-12" height="40px"/>
                </div>
            </div>
        )
    }else{
        return(
            <div className="service-card col-lg-3 line-height-1">
                <div className="row service-card-header">
                    <Skeleton height="200px" inline={false}/> 
                </div>
                <div className="row service-card-content">
                    <h3><Skeleton/></h3><br/>
                    <p><Skeleton/></p>
                </div>
                <div className="row service-card-footer">
                    <div className='col-6'>
                        <strong><Skeleton/></strong>
                    </div>
                    <div className='col-6 text-right'>
                        <strong><Skeleton/></strong>
                    </div>
                    <Skeleton className="book-button-div button-skeleton col-12" height="40px"/>
                </div>
            </div>
        )
    }
}

export default ServiceCardSkeleton