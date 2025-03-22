package es.gonzalo.conversor.conversor.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.gonzalo.conversor.conversor.service.ConversorService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/conversor")
public class ConversorController {

    private final ConversorService conversorService;

    public ConversorController(ConversorService conversorService){
        this.conversorService = conversorService;
    }

    @GetMapping("/convertir")    
    public double convertirConversor(@RequestParam double cantidad, 
    @RequestParam String from, @RequestParam String to){
        return conversorService.convertirConversor(cantidad, from, to);
    }




}
