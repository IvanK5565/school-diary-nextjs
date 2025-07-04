import { About, SignIn } from '@/components/signIn';

import { /*useEffect,*/ useState } from 'react';
import Register from '@/components/signIn/Register';
import Image from 'next/image';
// import { useRouter } from "next/router";

enum Landing {
	About,
	Login,
	Register,
}
const Home = () => {
	const [landing, setLanding] = useState(Landing.Login);
	// const {status} = useSession();
	// const router = useRouter();
	// useEffect(() => {
	//   if (status === "authenticated") {
	//     console.log('redirect to the /')
	//     router.push('/')
	//   }
	// }, [status, router]);
	// if(status === 'loading'){
	//   return <p>Loading...</p>
	// }
	return (
		<div className="bg-gray-100">
			<div className="px-8 py-8 max-w-xl mx-auto lg:max-w-full lg:px-0 lg:py-20 lg:relative lg:min-h-screen">
				<div className="xl:max-w-6xl lg:mx-auto">
					<div className="lg:w-7/12 lg:pl-12 lg:pr-8">
						<svg
							className="h-10 w-auto"
							viewBox="0 0 185 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M121.09 28.336c2.352 0 4.392-1.248 5.424-3.12l-2.688-1.536c-.48.984-1.512 1.584-2.76 1.584-1.848 0-3.216-1.368-3.216-3.264 0-1.92 1.368-3.288 3.216-3.288 1.224 0 2.256.624 2.736 1.608l2.664-1.56c-.984-1.848-3.024-3.096-5.376-3.096-3.648 0-6.336 2.76-6.336 6.336 0 3.576 2.688 6.336 6.336 6.336zM137.084 16v1.416c-.864-1.08-2.16-1.752-3.912-1.752-3.192 0-5.832 2.76-5.832 6.336 0 3.576 2.64 6.336 5.832 6.336 1.752 0 3.048-.672 3.912-1.752V28h3.096V16h-3.096zm-3.336 9.384c-1.896 0-3.312-1.368-3.312-3.384s1.416-3.384 3.312-3.384c1.92 0 3.336 1.368 3.336 3.384s-1.416 3.384-3.336 3.384zM149.851 18.976V16h-2.712v-3.36l-3.096.936V16h-2.088v2.976h2.088v4.992c0 3.24 1.464 4.512 5.808 4.032v-2.808c-1.776.096-2.712.072-2.712-1.224v-4.992h2.712zM153.57 14.56c1.056 0 1.92-.864 1.92-1.896s-.864-1.92-1.92-1.92c-1.032 0-1.896.888-1.896 1.92s.864 1.896 1.896 1.896zM152.034 28h3.096V16h-3.096v12zM163.676 28.336c3.528 0 6.36-2.76 6.36-6.336 0-3.576-2.832-6.336-6.36-6.336-3.528 0-6.336 2.76-6.336 6.336 0 3.576 2.808 6.336 6.336 6.336zm0-3.024c-1.824 0-3.24-1.368-3.24-3.312 0-1.944 1.416-3.312 3.24-3.312 1.848 0 3.264 1.368 3.264 3.312 0 1.944-1.416 3.312-3.264 3.312zM178.886 15.664c-1.608 0-2.856.6-3.576 1.68V16h-3.096v12h3.096v-6.48c0-2.088 1.128-2.976 2.64-2.976 1.392 0 2.376.84 2.376 2.472V28h3.096v-7.368c0-3.192-1.992-4.968-4.536-4.968z"
								fill="#667EEA"
							/>
							<path
								d="M61.063 28h3.768l3.144-11.088L71.143 28h3.768l4.704-16.8h-3.48L72.92 23.656 69.391 11.2H66.56l-3.504 12.456L59.84 11.2h-3.48L61.063 28zM85.674 28.336c3.528 0 6.36-2.76 6.36-6.336 0-3.576-2.832-6.336-6.36-6.336-3.528 0-6.336 2.76-6.336 6.336 0 3.576 2.808 6.336 6.336 6.336zm0-3.024c-1.824 0-3.24-1.368-3.24-3.312 0-1.944 1.416-3.312 3.24-3.312 1.848 0 3.264 1.368 3.264 3.312 0 1.944-1.416 3.312-3.264 3.312zM97.308 18.064V16h-3.096v12h3.096v-5.736c0-2.52 2.04-3.24 3.648-3.048V15.76c-1.512 0-3.024.672-3.648 2.304zM113.831 28l-4.968-6.072L113.687 16h-3.696l-4.128 5.28V11.2h-3.096V28h3.096v-5.448L110.231 28h3.6z"
								fill="#2D3748"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M43.911 12.604L36.213 8.16v20.645h9v2h-44v-2h4v-12.72l-3.728.933L1 15.078l21.09-5.273h3.122a9.552 9.552 0 0 0-.68 2.559l-.483 3.975 5.164-2.982v15.448h5V8.161l-7.696 4.444a7.502 7.502 0 0 1 2.565-4.8h-4.12a7.489 7.489 0 0 1 6.646-2.973l-5.591-3.228a7.488 7.488 0 0 1 6.696.402c1.039.6 1.88 1.41 2.5 2.347a7.461 7.461 0 0 1 2.5-2.347 7.49 7.49 0 0 1 6.698-.402l-5.593 3.228a7.488 7.488 0 0 1 6.646 2.973h-4.12a7.498 7.498 0 0 1 2.567 4.8zM25.213 28.805v-10h-6v10h6zm-11-8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
								fill="#667EEA"
							/>
						</svg>
						<div className="mt-8 lg:absolute lg:inset-y-0 lg:right-0 lg:w-5/12">
							<Image
								className="h-56 w-full object-cover object-center rounded-lg shadow-xl lg:inset-0 lg:h-full lg:shadow-none lg:rounded-none"
								src="/images/beach-work.jpg"
								alt="woman workcationing on beach"
                width={5385}
                height={3590}
							/>
							<svg
								className="hidden lg:block absolute inset-y-0 left-0 w-16 h-full"
								viewBox="0 0 100 100"
								preserveAspectRatio="none"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<polygon
									className="text-gray-100"
									fill="currentColor"
									points="0,0 0,100 100,0"
								/>
							</svg>
						</div>
						<SignIn
							className={landing == Landing.Login ? 'block' : 'hidden'}
							onRegister={() => setLanding(Landing.Register)}
						/>
						<Register
							className={landing == Landing.Register ? 'block' : 'hidden'}
							onLogin={() => setLanding(Landing.Login)}
						/>
						<About
							className={landing == Landing.About ? 'block' : 'hidden'}
							onLogin={() => setLanding(Landing.Login)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Home;
Home.getLayout = (page: React.ReactNode) => page;

// export const getServerSideProps = container.resolve("getServerSideProps")(
// 	[], true
// );
