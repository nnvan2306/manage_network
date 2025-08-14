// type Props = {
//     columns: { w?: number; label: string; key: string }[];
//     data: Array<Record<string, string | number>>;
// };
// const TableCommon = ({ columns, data }: Props) => {
//     return (
//         <div className="device-table">
//             <div className="table-header">
//                 {columns?.map(({ key, label }) => (
//                     <div className="th" key={key}>
//                         {label}
//                     </div>
//                 ))}
//                 <div className="th">Device Name</div>
//                 <div className="th">Actions</div>
//             </div>
//             {devices.map((device) => (
//                 <div key={device.id} className="table-row">
//                     <div className="td device-name">
//                         <strong>{device.name}</strong>
//                     </div>

//                     <div className="td actions">
//                         <button className="delete-button">Delete</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default TableCommon;
