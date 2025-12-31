package org.example.QuanLyMuaVu.Mapper;

import javax.annotation.processing.Generated;
import org.example.QuanLyMuaVu.DTO.Request.FarmerCreationRequest;
import org.example.QuanLyMuaVu.DTO.Request.FarmerUpdateRequest;
import org.example.QuanLyMuaVu.DTO.Response.FarmerResponse;
import org.example.QuanLyMuaVu.Entity.User;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-31T08:26:40+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class FarmerMapperImpl implements FarmerMapper {

    @Override
    public User toUser(FarmerCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.username( request.getUsername() );
        user.password( request.getPassword() );

        return user.build();
    }

    @Override
    public FarmerResponse toFarmerResponse(User user) {
        if ( user == null ) {
            return null;
        }

        FarmerResponse.FarmerResponseBuilder farmerResponse = FarmerResponse.builder();

        farmerResponse.id( user.getId() );
        farmerResponse.username( user.getUsername() );

        return farmerResponse.build();
    }

    @Override
    public void updateUser(User user, FarmerUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        user.setPassword( request.getPassword() );
    }
}
