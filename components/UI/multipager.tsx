import React, {useState} from 'react';
import cl from '../../styles/UI/multipager.module.sass'
import Mybutton2 from "./mybutton2";

const Multipager = ({pages}: any) => {

    const [content, setContent] = useState()

    return (
        <div className={'container'}>
            <div className={cl.multipager + ' row'}>
                <div className={cl.menu + ' col-lg-3'}>
                    {
                        pages.map((page: any) => {
                            return <Mybutton2 onClick={() => setContent(page[1])} fullwidth={true}>{page[0]}</Mybutton2>
                        })
                    }

                </div>
                <div className={cl.content + ' col-lg-9'}>
                    {content}
                </div>
            </div>
        </div>

    );
};

export default Multipager;