import { shallowMount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage component', () => {

    let warapper

    beforeEach(() => {
        warapper = shallowMount(PokemonPage)
    })

    test('debe de hacer match con el snapshot', () => {
        expect(warapper.html()).toMatchSnapshot()
    })

    test('debe de llamar el mixpokemonArray al montar', () => {

        const mixpokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixpokemonArray')
        const warapper = shallowMount(PokemonPage)
        expect(mixpokemonArraySpy).toHaveBeenCalled()
    })

    test('debe de hacer match con el snapshot cunado cargan los pokemons', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: [pokemons],
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                }
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: [pokemons],
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                }
            }
        })

        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')

        expect(picture.exists()).toBeTruthy()
        expect(options.exists()).toBeTruthy()

        expect(picture.attributes('pokemonid')).toBe('1')
        expect(options.attributes('pokemons')).toBeTruthy()
    })

    test('pruebas con checkAnswer', async() => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: [pokemons],
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                }
            }
        })
        await wrapper.vm.checkAnswer(1)
        expect(wrapper.vm.message).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBeTruthy()
        expect(wrapper.vm.message).toBe(`Correcto, ${pokemons[0].name}`)

        await wrapper.vm.checkAnswer(10)
        expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`)
    })
})