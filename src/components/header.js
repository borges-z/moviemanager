export default function Header(){
    return(<>

        <nav className="bg-white shadow dark:bg-gray-800 mb-20">
            <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                <a href="/" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">home</a>

                <a href="/form-filmes" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Cadastra Filme</a>

                <a href="form-genero" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Cadastrar Genêro de filme</a>

                <a href="#" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
                    <img width="19px" src="https://www.svgrepo.com/show/458490/world-2.svg"></img>
                </a>

                <a href="#" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
                    <img width="19px" src="https://www.svgrepo.com/show/522195/movie-recorder.svg"></img>
                </a>
            </div>
        </nav>
    </>);
}