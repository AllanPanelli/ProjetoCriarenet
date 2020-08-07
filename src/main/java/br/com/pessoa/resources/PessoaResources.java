package br.com.pessoa.resources;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONException;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.pessoa.model.Pessoa;
import br.com.pessoa.repository.PessoaRepository;



@Controller
public class PessoaResources {



    public List<Pessoa> carregaDados() throws Exception {
    String url = "https://api.mocki.io/v1/a2790e8c";

    try {

        Connection.Response  response2 = Jsoup.connect(url).ignoreContentType(true).execute();

        JSONArray jsonObject = new JSONArray(response2.body());

        ObjectMapper mapper = new ObjectMapper();


        return mapper.readValue(jsonObject.toString(), new TypeReference<List<Pessoa>>() {});


    } catch (IOException e) {
        e.printStackTrace();
        return null;
    }
}


@RequestMapping(value = "/index", method = RequestMethod.GET)
public String abrirIndex() {
    return "index";
}

@RequestMapping(value = "/listar", method = RequestMethod.GET)
public String abrirListar() {
    return "listar";
}


@Autowired
PessoaRepository pessoaRepository;


//Select ALL
@RequestMapping(value = "/carregar", method = RequestMethod.GET)

public ResponseEntity < List < Pessoa >> obterPessoas() throws Exception {
    List < Pessoa > pessoas;
    pessoas = this.carregaDados();

    return new ResponseEntity<List<Pessoa>>(pessoas, HttpStatus.OK);
}
	

	

		
	
}
