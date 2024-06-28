import React, { Component } from 'react';
import PageForm from '../PageForm/PageForm';
class DichThuatHandle extends Component {
    render() {
        return (
            <PageForm body={
                <div>
                    <div className='row row-cols-6 row-cols-xxxxxl-5 row-cols-xxxxl-4 row-cols-xl-3 row-cols-lg-2 gy-6 gx-xxl-2 gx-xl-3 gx-lg-2'>
                        {/* {this.showDichThuat()} */}
                        <div className="form-group">
                            <label htmlFor="" />
                            <input
                                type="text"
                                className="form-control"
                                name=""
                                id=""
                                aria-describedby="helpId"
                                placeholder=""
                            />
                            <small id="helpId" className="form-text text-muted">
                                Help text
                            </small>
                        </div>

                    </div>
                </div>
            }/>
        );
    }
}

export default DichThuatHandle;