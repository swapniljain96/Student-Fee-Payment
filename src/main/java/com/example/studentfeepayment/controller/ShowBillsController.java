package com.example.studentfeepayment.controller;

import com.example.studentfeepayment.bean.Bills;
import com.example.studentfeepayment.bean.Students;
import com.example.studentfeepayment.service.ShowStudentBillsService;
import com.fasterxml.jackson.core.JsonProcessingException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URISyntaxException;
import java.util.List;

@Path("bills")
public class ShowBillsController {

    @POST
    @Path("/show")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response showBills(Students request) throws URISyntaxException, JsonProcessingException {
        List<Bills> response = new ShowStudentBillsService().getBills(request);
        System.out.println("Show Bills response: ");
        response.forEach(System.out::println);
        return Response.ok().entity(response).build();
    }

}