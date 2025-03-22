package es.gonzalo.conversor.conversor.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import es.gonzalo.conversor.conversor.model.ConversorResponse;

@Service
public class ConversorService {

    private final String API_URL = "https://api.exchangerate-api.com/v4/latest/";

    public double convertirConversor(double amount, String from, String to) {
        RestTemplate restTemplate = new RestTemplate();
        ConversorResponse response = restTemplate.getForObject(API_URL + from, ConversorResponse.class);

        if (response != null && response.getRates().containsKey(to)) {
            double rate = response.getRates().get(to);
            return amount * rate;
        }

        throw new RuntimeException("No se pudo obtener la tasa de cambio");
    }


}
