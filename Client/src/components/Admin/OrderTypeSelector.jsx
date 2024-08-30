// import React from 'react';

// const OrderTypeSelector = ({ orderTypes, selectedOrderType, onSelect }) => {
//     return (
//         <div className="flex space-x-4 mb-6">
//             {orderTypes.map(orderType => (
//                 <button
//                     key={orderType.id}
//                     onClick={() => onSelect(orderType.id)}
//                     className={`border px-3 py-2 rounded-3xl ${selectedOrderType === orderType.id ? 'bg-black text-white' : 'bg-white'}`}
//                 >
//                     {orderType.name}
//                 </button>
//             ))}
//         </div>
//     );
// };

// export default OrderTypeSelector;

import React from 'react';

const OrderTypeSelector = ({ orderTypes, selectedOrderType, onSelect }) => {
    return (
        <div className="flex space-x-4 mb-6">
            {orderTypes.map(orderType => (
                <button
                    key={orderType.id}
                    onClick={() => onSelect(orderType.id)}
                    className={`border px-3 py-2 rounded-3xl ${selectedOrderType === orderType.id ? 'bg-black text-white' : 'bg-white'}`}
                >
                    {orderType.name}
                </button>
            ))}
        </div>
    );
};

export default OrderTypeSelector;
