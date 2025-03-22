package es.gonzalo.conversor.conversor.model;

import lombok.Data;
import java.util.Map;

@Data
public class ConversorResponse {

    private String base;
    private String date;
    private Map<String, Double> rates;
}
