import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, updateData } from '../features/common/modalSlice'
import AccountModalBody from '../features/account/components/AccountModalBody'
import PaymentModalBody from '../features/cash/components/PaymentModalBody'
import PaymentInfoDetailModalBody from "../features/cash/components/PaymentInfoDetailModalBody";
import AdjustmentModalBody from "../features/adjustment/components/AdjustmentModalBody";
import ApproveDataModalBody from "../features/adManagement/components/ApproveDataModalBody";
import ApproveModalBody from "../features/adManagement/components/ApproveModalBody";
import ImageViewModalBody from "../features/common/components/ImageViewModalBody";
import UseCashList from "../features/cash/components/UseCashList";
import StatisticModalBody from "../features/adManagement/components/StatisticModalBody";
function ModalLayout() {
    const { isOpen, bodyType, size, extraObject, title } = useSelector(state => state.modal)
    const dispatch                                       = useDispatch()

    const close  = (e) => {
        dispatch(closeModal(e))
    }
    const update = (e) => {
        dispatch(updateData(e))
    }
    const boxClassName = size === 'lg' ? 'max-w-2xl h-[40rem]' : size;

    return (<>
        {/* The button to open modal */ }

        {/* Put this part before </body> tag */ }
        <div className={ `modal ${ isOpen ? "modal-open" : "" }` }>
            <div className={ `modal-box  ${ boxClassName }` }>
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={ () => close() }>✕
                </button>
                <h1 className="font-semibold text-2xl pb-6 text-center">{ extraObject.message }</h1>
                <h3 className="font-semibold text-2xl pb-6 text-center">{ title }</h3>


                {/* Loading modal body according to different modal type */ }
                { {
                    [MODAL_BODY_TYPES.CREATE] : <AccountModalBody extraObject={ extraObject } closeModal={ close } />,
                    [MODAL_BODY_TYPES.PAYMENT_INFO] : <PaymentModalBody extraObject={ extraObject } closeModal={ close } />,
                    [MODAL_BODY_TYPES.PAYMENT_INFO_DETAIL] : <PaymentInfoDetailModalBody extraObject={ extraObject } closeModal={ close }/>,
                    [MODAL_BODY_TYPES.ADJUSTMENT] : <AdjustmentModalBody extraObject={ extraObject } closeModal={ close }></AdjustmentModalBody>,
                    [MODAL_BODY_TYPES.APPROVE_DATA] : <ApproveDataModalBody extraObject={ extraObject } closeModal={ close }></ApproveDataModalBody>,
                    [MODAL_BODY_TYPES.APPROVE] : <ApproveModalBody extraObject={ extraObject } closeModal={ close }></ApproveModalBody>,
                    [MODAL_BODY_TYPES.IMAGE_VIEW] : <ImageViewModalBody extraObject={ extraObject } closeModal={ close }></ImageViewModalBody>,
                    [MODAL_BODY_TYPES.CASH_LIST] : <UseCashList extraObject={ extraObject } closeModal={ close }></UseCashList>,
                    [MODAL_BODY_TYPES.STATISTIC] : <StatisticModalBody extraObject={ extraObject } closeModal={ close }></StatisticModalBody>,

                    [MODAL_BODY_TYPES.DEFAULT] : <div></div>
                }[bodyType] }
            </div>
        </div>
    </>)
}

export default ModalLayout