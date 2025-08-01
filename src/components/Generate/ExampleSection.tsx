// import { GenerationExample } from "src/types/generator/GenerationExample";
// import { MediumLabel } from "../Texts/MediumLabel";
// import { Center } from "../Misc/Center";
// import { LoadingSpinner } from "../Misc/LoadingSpinner";

// export const ExampleSection = ({
//   examples,
// }: {
//   examples: GenerationExample[];
// }) => (
//   <>
//     <MediumLabel text="Beispiele" className="mt-4 mb-2" />
//     <ul className="flex flex-col gap-4" aria-label="Beispiel Liste">
//       {examples.length == 0 ? (
//         <Center>
//           <LoadingSpinner aria-label="Lade Beispiele" />
//         </Center>
//       ) : (
//         examples.map((e) => (
//           <li
//             key={`example-${examples.indexOf(e)}`}
//             className="flex flex-col font-medium"
//             aria-label={`Beispiel ${examples.indexOf(e) + 1}`}
//           >
//             <div className="flex flex-row gap-2 items-start">
//               <img
//                 src={e.imageUrl}
//                 className="w-5/12 max-w-36"
//                 alt="Beispielbild"
//               />
//               <p
//                 className="text-md lg:text-lg w-7/12 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:5] [-webkit-box-orient:vertical]"
//                 aria-label="Beispieltext"
//               >
//                 {e.text}
//               </p>
//             </div>
//             <div className="flex flex-row gap-2 mt-2" aria-label="Stilarten">
//               {Object.entries(e.styles)
//                 .filter(([_, v]) => v != false)
//                 .map(([k, v]: [k: string, v: boolean]) => (
//                   <span
//                     key={`example-${examples.indexOf(e)}-style-${k}`}
//                     className={`px-2 border rounded-md ${
//                       v ? "bg-green-700 text-white" : "bg-ap-new-dark-beige"
//                     }`}
//                     aria-label={`Stil: ${k}`}
//                   >
//                     {k.capitalize()}
//                   </span>
//                 ))}
//             </div>
//           </li>
//         ))
//       )}
//     </ul>
//   </>
// );
