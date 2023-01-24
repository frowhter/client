import React, {memo} from 'react';
import Button from "../Buttons/Button";
import btnClasses from '../Buttons/Button.module.scss'


interface IPaginationItemProps{
    children?: React.ReactNode;
    active: boolean;

    onClick: ()=>void;
}
const PaginationItemPoint: React.FC<IPaginationItemProps> = memo(({children, active, onClick}) => {
    return (
        <Button onClick={onClick} className={active ? btnClasses.filled + ' ' + btnClasses.navigatePaginationPoint : btnClasses.blank_text_blue+ ' ' + btnClasses.navigatePaginationPoint}>
            {children}
        </Button>
    );
});

export default PaginationItemPoint;