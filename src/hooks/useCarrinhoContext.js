import { useContext } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

export const useCarrionhoContext = () => {
    const { carrinho, setCarrinho } = useContext(CarrinhoContext)

    function mudarQuantidade (id, quantidade) {
        return carrinho.map((itemDoCarrinho) => {
            if(itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
            return itemDoCarrinho;
        });
    }

    function adicionarProduto (novoProduto) {
      const temOProduto = carrinho.some((itemDoCarrinho)=>{ 
        return itemDoCarrinho.id === novoProduto.id;
      });
  
      if(!temOProduto) {
        novoProduto.quantidade = 1;
        return setCarrinho((carrinhoAnterior)=>[
          ...carrinhoAnterior,
          novoProduto,
        ])
      }

      const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1);
  
      setCarrinho([...carrinhoAtualizado]);
    }

    function removerProduto(id) {
        // encontra o produto em questão
        const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
        // verifica se a quantidade é igual a um. Isso significa que este é o último 
        // produto do tipo no carrinho
        const ehOUltimo = produto.quantidade === 1;
        // Com o if faz a verificação do último produto do tipo no carrinho e atualiza o estado do carrinho
        if (ehOUltimo) {
            return setCarrinho((carrinhoAnterior) =>
            carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
            );
        }

        const carrinhoAtualizado = mudarQuantidade(id, -1);

        // Se não é o último produto do carrinho, só atualizamos a quantidade, removendo um item
        setCarrinho(...carrinhoAtualizado);
    }

    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
    };
};