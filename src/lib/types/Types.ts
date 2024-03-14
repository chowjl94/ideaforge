import { chats } from "@/db/schema";
import { RecordMetadataValue } from "@pinecone-database/pinecone/dist/data/types";
export interface ChatCreationRequest {
	file_key: string;
	file_name: string;
}

export interface UploadResponse {
	message: string;
	status: Number;
	chat_id: string;
}

export interface PDFMetadata {
	version: string;
	info: {
		PDFFormatVersion: string;
		IsAcroFormPresent: boolean;
		IsXFAPresent: boolean;
		Title: string;
		Creator: string;
		Producer: string;
		CreationDate: string;
	};
	metadata?: any; // You might want to specify a more specific type if possible
	totalPages: number;
}

export interface PDFDocument {
	pageContent: string;
	metadata: {
		text: RecordMetadataValue;
		source: string;
		pdf: PDFMetadata;
		loc: {
			pageNumber: number;
		};
	};
}

export interface NeonChats {
	userId: string;
	fileName: string;
	fileUrl: string;
	fileKey: string; // Include fileKey property
	id?: number;
	createdAt?: Date;
}

export interface ChatsTableConfig {
	id: number;
	fileName: string;
	fileUrl: string;
	fileKey: string;
	createdAt: Date;
	userId: string;
}

export interface MessagesTableConfig {
	id: number;
	chatId: number;
	chatContent: string;
	createdAt: Date;
	role: string; // Assuming roleEnum returns string type
}

export type DrizzleChat = typeof chats.$inferSelect;
// sampel api repsone
// {
//     "message": "Success",
//     "status": 200,
//     "pages": [
//         [
//             {
//                 "pageContent": "Chow Jing Lun \nWeb Developer \nWeb developer and tech enthusiast at heart. Highly motivated individual with the will to learn and excel, team-oriented leader. Proven to excel in\nstressful and fast paced environment in both sports and tech. \nchowjl94@gmail.com \n91283531 \nSingapore, Singapore \nlinkedin.com/in/chowjinglun \nSKILLS \nSQL Python \nReact JavaScript \nDjango Express.js \nGit Typescript \nMaterialUI Zustand \nPowerBi TailWind CSS \nLANGUAGES \nEnglish \nFull Professional Proficiency \nChinese \nProfessional Working Proficiency \nINTERESTS \nScience and technology \nSports Web 3.0 \nthree.js ReactFibre \nWeb Development \nEDUCATION \nBachelor of Engineering(Materials Science Engineering) \nNanyang Technological University \n08/2015 - 12/2019,  Singapore \nPERSONAL PROJECTS \nNext Movies (06/2022 - Present) \nA movie catalog built using framer motion , tailwind CSS and Next.JS and deployed with Vercel \nhttps://next-lac-seven.vercel.app/ \nKCRYIPT (09/2022 - Present) \nA peer to peer payment app, with solidity smart contract deployed to Goerli test net, using Alchemy web3 development\nplatform \nBuilt with Tailwind CSS and React and Typescript, and ethers.js connection to MetaMask wallet \nhttps://kcryipt.com/ \nWORK EXPERIENCE \nFrontend Developer \nINMAGINE Labs \n05/2023 - 11/2023,  Singapore \nINMAGINE labs is a stock photo company focused on making design easier with AI and analytics for easier content creation \nContributed to development of custom Material-UI components for UI redesign of AI Writer app next.js \nImplemented and maintained state management Zustand , for smooth application behavior \nDeveloped and maintained responsive UI/UX for mobile/desktop platforms using Material-UI \nCollaborated with back- end developers to ensure API integration of front- end and back- end systems \nActively participated in agile development processes and sprint planning \nFull - Stack Developer \nTVConal \n06/2021 - 07/2022,  Singapore \nTVConal is a technology startup with the main line of business in using analytics to support content creation in TV broadcasting \nDeveloped mobile responsive UI/UX , React using Bootstrap for Player Management dashboard app. \nDeveloped , maintained and integrated CRUD , media upload , canvas annotation APIs with Django for\nPlayer Management app. \nImplemented tier-based access control for backend microservice and front end UI/UX in Player\nManagement Web App for Cricket South Africa comprising of over 100 users(coaches/players/analyst). \nResponsible for refactoring frontend to ES7 , React 16.8 with the implementation of react hooks in Match\nPrediction Analytics app. \nImplemented and integrated Slack APIs to monitor accuracy and frequency of outputs from data\ngenerated from inhouse predictive analytic models. \nORGANIZATIONS \nSingapore Water Polo National Team (06/2015 - 12/2023) \nDeveloper Responsibilities \nSoftware Developer Responsibilities ",
//                 "metadata": {
//                     "source": "C:\\Users\\ChowJ\\AppData\\Local\\Temp\\pdf-1709720326836.pdf",
//                     "pdf": {
//                         "version": "1.10.100",
//                         "info": {
//                             "PDFFormatVersion": "1.4",
//                             "IsAcroFormPresent": false,
//                             "IsXFAPresent": false,
//                             "Title": "",
//                             "Creator": "wkhtmltopdf 0.12.4",
//                             "Producer": "Qt 4.8.7",
//                             "CreationDate": "D:20231122092737+01'00'"
//                         },
//                         "metadata": null,
//                         "totalPages": 1
//                     },
//                     "loc": {
//                         "pageNumber": 1
//                     }
//                 }
//             }
//         ]
//     ]
// }
