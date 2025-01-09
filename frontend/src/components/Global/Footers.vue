<template>
    <section class="py-1 bottom-0 w-full">
        <div id="sect" class="px-5 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div class="text-center xl:flex xl:items-center xl:justify-between xl:text-left">
                <div class="xl:flex xl:items-center xl:justify-start">
                    <p id="copy" class="text-sm text-white xl:ml-6 xl:mt-0">© Copyright 2025 Painel2px</p>
                </div>
    
                <div class="items-center mt-8 xl:mt-0 xl:flex xl:justify-end xl:space-x-8">
                    <ul id="bottom" class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 xl:justify-end">
                        <li>
                            <a href="https://robogestor.com.br/termos-de-uso" title="" class="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"> Termos de Uso </a>
                        </li>
    
                        <li>
                            <a href="https://robogestor.com.br/politicas-de-privacidade" title="" class="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"> Politicas de Privacidade </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>
    
<style scoped>

    section {
        background-color: var(--binance-black);
        border-top: 1px solid #414147;
    }
    
    #sect {
        padding: 10px 0px;
    }
    
    p, a {
        font-weight: 600;
        color: var(--binance-white);
    }
    
    #copy {
        padding-top: 0px;
        margin-bottom: 0px;
    }
    
    #bottom {
        padding-bottom: 0px;
    }
    
    @media (max-width: 768px) {
    
        #copy {
            padding-top: 5px;
            margin-bottom: -20px;
        }
    
        #bottom {
            padding-bottom: 5px;
        }
    
    }
    
</style>